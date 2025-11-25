import "./error.css"

interface ErrorProps {
    mensaje:string
}

export function Error({mensaje}:ErrorProps ) {

    return (

        <> 
            <h1>Error: {mensaje}</h1>
        </>

    )

}