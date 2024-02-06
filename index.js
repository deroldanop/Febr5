// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id)
{
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  try {
    const databaseName = await central(id)
    ;

    const basicInfo = await dbs[databaseName](id);
    const vaultInfo = await vault(id);

    return {
      id,
      name: vaultInfo.name,
      username: basicInfo.username,
      email: vaultInfo.email,
      address: {
        street: vaultInfo.address.street,
        suite: vaultInfo.address.suite,
        city: vaultInfo.address.city,
        zipcode: vaultInfo.address.zipcode,
        geo: {
          lat: vaultInfo.address.geo.lat,
          lng: vaultInfo.address.geo.lng
        }
      },
      phone: vaultInfo.phone,
      website: basicInfo.website,
      company: {
        name: basicInfo.company.name,
        catchPhrase: basicInfo.company.catchPhrase,
        bs: basicInfo.company.bs
      }
    };
  } catch (error) {
    return Promise.reject(`Error: ${error}`);
  }
}

// Example usage:
getUserData(5)
  .then((userInfo) => console.log(userInfo))
  .catch((error) => console.error(error));