import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

export const init = async () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS placesDB (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);",
          [],
          (_queyr,success) => {
            resolve();
          },
          (_query, err) => {
            reject(err);
          }
        );
      }
      // (err) => {
      //   reject(err);
      // },
      // (success) => {
      //   resolve(success);
      // }
    );
  });

  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO placesDB (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
          [title,imageUri,address,lat,lng],
          (_query,success) => {
            resolve(success);
          },
          (_query, err) => {
            reject(err);
          }
        );
      },
      // (err) => {
      //   reject(err);
      // },
      // (success) => {
      //   resolve(success);
      // }
    );
  });

  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM places',
          [],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
};