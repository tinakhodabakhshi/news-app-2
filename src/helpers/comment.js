export const leaveComment = async (name, url, date, feedback) => {
  try {
    const data = {
      name, url, date, feedback
    };
    const response = await fetch('http://localhost:3004/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to insert data into comments');
    }
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export const getComments = async (url) => {
  try {
    const response = await fetch('http://localhost:3004/comments');
    const resJson = await response.json();

    const comments = resJson.filter((comment) => comment.url = url);
    if (comments === undefined)
      return [];

    return comments;
  } catch (error) {
    console.error(error);
    return false;
  }
}