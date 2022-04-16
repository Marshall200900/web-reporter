import db from "$lib/database";

export const get = async () => {
    const result = await new Promise((resolve) => {
        db.all("SELECT rowid AS id, info FROM lorem", (err, rows) => {
            resolve(rows);
        })
    });
    return {
        body: {
            result
        }
    }
}