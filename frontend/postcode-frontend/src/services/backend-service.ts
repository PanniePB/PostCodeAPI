import {
  CreateSuburbDTO,
  Suburb,
  UpdateSuburbDTO,
} from "../scripts/interfaces";

const hostDomain = `http://127.0.0.1:8080`;


export const getAllSuburb = async (): Promise<Suburb[]> => {
  //// fetch data
  const response = await fetch(`${hostDomain}/suburb`);

  if (!response.ok) {
    throw new Error("Could not get suburbs");
  }

  const data = await response.json();

  return data;
};

export const createSuburb = async (data: CreateSuburbDTO): Promise<void> => {
  const formattedData = {
    ...data,
  };

  const response = await fetch(`${hostDomain}/suburb`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData),
  });

  if (!response.ok) {
    const errorJson = await response.json(); // Get the response text
    throw new Error(`Cannot create new suburb because ${errorJson.message}`);
  }
};

export const getSuburbById = async (id: Suburb["id"]): Promise<Suburb> => {
  const response = await fetch(`${hostDomain}/suburb/${id}`);

  if (!response.ok) {
    throw new Error(`Suburb with id : ${id} does not exist`);
  }

  const suburb: Suburb = await response.json();

  return suburb;
};

export const deleteSuburbById = async (id: Suburb["id"]): Promise<void> => {
  const response = await fetch(`${hostDomain}/suburb/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete suburb");
  }
};

export const updateSuburbById = async (
  id: Suburb["id"],
  data: UpdateSuburbDTO
): Promise<void> => {
  const formattedData = {
    ...data,
  };
  console.log(formattedData);

  const response = await fetch(`${hostDomain}/suburb/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formattedData),
  });

  if (!response.ok) {
    throw new Error(`Could not update suburb ${id}`);
  }
};

export const getSuburbsByPostcode = async (
  postcode: Suburb["postcode"]
): Promise<Suburb[]> => {
  //// fetch data
  const response = await fetch(`${hostDomain}/suburb/getSuburb${postcode}`);

  if (!response.ok) {
    throw new Error("Could not get suburbs");
  }

  const data = await response.json();

  return data;
};

export const getPostcodeBySuburb = async (
  suburb: Suburb["name"]
): Promise<Suburb[]> => {
  //// fetch data
  const response = await fetch(`${hostDomain}/postcode/getPostcode${suburb}`);

  if (!response.ok) {
    throw new Error("Could not get postcode");
  }

  const data = await response.json();

  return data;
};
