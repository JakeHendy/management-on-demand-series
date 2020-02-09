import { APIGatewayProxyEvent } from "aws-lambda";
import "aws-sdk/clients/ec2"
import EC2 = require("aws-sdk/clients/ec2");
const ec2 = new EC2();

function createVpcArray(result: EC2.DescribeVpcsResult): any[] {
    let finalArray:any[] = [];
    result.Vpcs?.forEach(v => {
        finalArray.push({
            "vpc_id": v.VpcId,
            "name": v.Tags?.filter(t => t.Key == "Name") ?? v.VpcId
        })
    })
    return finalArray;
}

export const handler = async (event: APIGatewayProxyEvent): Promise<any> => {
    ec2.describeVpcs({}, function(err, data) {
        if (err) { 
            console.log(err, err.stack);
        } // an error occurred
        const responseBody = {
            "region": "eu-west-2",
            "vpcs": createVpcArray(data)
        }
        let response = {
            statusCode: 200,
            headers: {
                "x-custom-header" : "my custom header value"
            },
            body: JSON.stringify(responseBody)
        };
        return response;
    });
}