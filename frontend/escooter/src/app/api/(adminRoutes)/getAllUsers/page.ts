import { error } from "console";

export const getAllUsers = async (token:string): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:4000/admin/getAllUsers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + token,
      },
    });


    if (response.ok) {
        const data = await response.json();
      return data;
    } else {
      console.error('Error', error);
      return false;
    }
  } catch (error) {
    console.error('ERROR', error);
    return false;
  }
};