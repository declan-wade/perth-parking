"use client";

import React from "react";
import { getData } from "./fetch";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  getKeyValue,
  Spinner,
} from "@nextui-org/react";
import { Link } from "@nextui-org/react";

export default function Home() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const liveData = ["Citiplace", "Concert Hall", "Council House", "Cultural Centre", "Elder Street", "Goderich Street", "His Majesty's", "Mayfair Street", "Pier Street", "Roe Street", "State Library", "Terrace Road"];

  async function handleGetData() {
    const response = await getData();
    setData(response);
    console.log(response);
    setIsLoading(false);
  }

  React.useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div>
      <Navbar isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">CPP Tracker</p>
        </NavbarBrand>
      </Navbar>
      <Table radius="none">
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Spaces</TableColumn>
          <TableColumn>Open?</TableColumn>
          <TableColumn>Link</TableColumn>
        </TableHeader>
        {data ? (
          data.length > 0 ? (
            <TableBody>
              {data.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>
                    {liveData.includes(item.title) ? (
                      <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color="success"
                        variant="dot"
                      >
                        {item.free_space}
                      </Chip>
                    ) : (
                      <Chip
                        className="capitalize border-none gap-1 text-default-600"
                        color="primary"
                        variant="dot"
                      >
                        {item.free_space}
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      className="capitalize"
                      color={item.opennow ? "success" : "danger"}
                      size="sm"
                      variant="flat"
                    >
                      {item.opennow ? "Open" : "Closed"}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    <Link
                      isExternal
                      href={`${item.url}`}
                      showAnchorIcon
                      size="sm"
                    >
                      Details
                    </Link>{" "}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
          )
        ) : (
          <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
        )}
      </Table>
    </div>
  );
}
