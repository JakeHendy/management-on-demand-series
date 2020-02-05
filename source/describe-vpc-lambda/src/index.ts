import { APIGatewayProxyEvent } from "aws-lambda";

export const handler = async (event: APIGatewayProxyEvent): Promise<any> => {
    console.log('Hello World!');
    const responseBody = {
        "region": "eu-west-2",
        "vpcs": [
            {
                "id": "vpc-xxxxxx",
                "name": "Jake"
            }
        ]
    }
    let response = {
        statusCode: 200,
        headers: {
            "x-custom-header" : "my custom header value"
        },
        body: JSON.stringify(responseBody)
    };
    return response;
}