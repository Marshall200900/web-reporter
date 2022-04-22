export const post = async ({ request }) => {
    console.log(await request.text())
    // const result = await new Promise((resolve) => {
    //     db.all("SELECT rowid AS id, info FROM lorem", (err, rows) => {
    //         resolve(rows);
    //     })
    // });

    return {
        body: {
            props: {
                foo: "hello"
            }
        }
    }
}