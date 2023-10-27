const insertData = async (resource, newData) => {
  console.log(newData);

  try {
    const response = await fetch(`http://localhost:3004/${resource}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    });

    if (!response.ok) {
      throw new Error(`Failed to insert data into ${resource}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default insertData;
