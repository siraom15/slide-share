import { Result, Button } from 'antd'
import Link from 'next/link'
const Error = ({ statusCode }) => {
    return (
        <>
            <Result
                status={statusCode}
                title={statusCode}
                subTitle="Sorry, something went wrong."
                extra={<Link href="/"><Button type="ghost">Back Home</Button></Link>}
            />
        </>
    )
}

Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error