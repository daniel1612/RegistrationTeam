import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data);

    const validationError = validateFormData(data);
    if (validationError) {

      return res.status(200).json({ success: false, error: validationError });
    }

    const totalPrice = calculateTotalPrice(data);
    console.log("Total!!", totalPrice);

    res.status(200).json({ success: true, data: { ...data, totalPrice } });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

function validateFormData(data: any): string | null {
  if (!data.selectedEmployee || data.numberOfChildren < 0 || data.numberOfAdultsChildren < 1 || data.numberOfPersons < 1) {
    return 'Please fill in all required fields.';
  }

  if (data.numberOfAdultsChildren > data.numberOfChildren) {
    return 'Please The number of Adult childern cannot bigger from number of childern!';

  }

  if (data.numberOfPersons < data.numberOfAdultsChildren || data.numberOfPersons < data.numberOfChildren) {
    return 'Please, the number of people cannot be less than the number of children';

  }


  if (data.spouseJoining) {

    if (data.numberOfPersons !== data.numberOfChildren + 2) {

      return "The total number of persons does not match";

    }
  } else if (data.numberOfPersons !== data.numberOfChildren + 1) {
    console.log("benzug", data.spouseJoining);

    return "The total number of persons does not match";

  }
  return null; // Return null if validation passes
}

function calculateTotalPrice(data: any) {
  let totalPrice = 500;

  if (data.spouseJoining) {
    totalPrice += 100;
    totalPrice += 2 * 20;
  }

  totalPrice += (data.numberOfChildren - data.numberOfAdultsChildren) * 50;
  totalPrice += data.numberOfAdultsChildren * 250;
  totalPrice += data.numberOfPlaces * 25;

  totalPrice += data.numberOfChildren * 10;
  totalPrice += 20;

  if (data.numberOfRooms > 1) {
    let deserveRoom = (Math.ceil((data.numberOfPersons)) / 2);
    if (deserveRoom < data.numberOfRooms) {

      totalPrice += 500 * (data.numberOfRooms - deserveRoom);
    }
  }

  if (data.shabbatObservance) {
    totalPrice -= totalPrice * 0.18;
  }

  return totalPrice;
}
