export async function RequestHandler(props) {
    try {
        const response = await fetch(props.url, {
            method:props.method,
            body: JSON.stringify(props.body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.access_token
            }
        });
        if (!response.ok) {
            let errorString;
            if (response.status === 401) {
                errorString = "User is unauthorized"
            }
            else {
                errorString = "Response status: " + response.status.toString()
            }
            throw new Error(errorString)
        }

        const data = await response.json()
        return {success: true, data: data}
        }
        catch (error) {
            return {success: false, data: error}
        }
}