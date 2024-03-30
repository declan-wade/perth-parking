"use server"

export async function getData() {
    const payload = await fetch(
      "https://www.cityofperthparking.com.au/json/cpp/map/carpark/alt/0?1711695748958",
      { next: { revalidate: 1800 } }
    );
    const data = await payload.json();
  
    // De-duplication step
    const uniqueData = data.reduce((acc, currentItem) => {
      const existingItem = acc.find((item) => item.id === currentItem.id);
      if (!existingItem) {
        return [...acc, currentItem];
      }
      return acc;
    }, []);
  
    // Sorting by 'title' field in alphabetical order
    uniqueData.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
  
    return uniqueData;
  }
  