using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

using Amazon.Lambda.TestUtilities;
using Amazon.Lambda.APIGatewayEvents;

using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.Model;

using Newtonsoft.Json;

using Xunit;

using signupapi.Models;

namespace signupapi.Tests
{
    public class FunctionTest : IDisposable
    {
        string TableName { get; }
        IAmazonDynamoDB DDBClient { get; }

        public FunctionTest()
        {
            this.TableName = "BlueprintBaseName-Clients-" + DateTime.Now.Ticks;
            this.DDBClient = new AmazonDynamoDBClient(RegionEndpoint.USEast1);

            SetupTableAsync().Wait();
        }

        [Fact]
        public async Task ClientTestAsync()
        {
            TestLambdaContext context;
            APIGatewayProxyRequest request;
            APIGatewayProxyResponse response;

            Functions functions = new Functions(this.DDBClient, this.TableName);


            // Add a new client
            Client newClient = new Client();
            newClient.FirstName = "FirstName";
            newClient.LastName = "LastName";
            newClient.StreetAddress = "123 Main Street";
            newClient.City = "Mainville";
            newClient.Zip = "12345";
            newClient.Phone = "518-123-4567";
            newClient.Email = "bob@aol.com";
            newClient.FamilySize = 13;
            newClient.AlternateFirstName = "AltFirstName";
            newClient.AlternateLastName = "AltLastName";
            newClient.AlternatePhone = "518-987-6543";

            request = new APIGatewayProxyRequest
            {
                Body = JsonConvert.SerializeObject(newClient)
            };
            context = new TestLambdaContext();
            response = await functions.AddClientAsync(request, context);
            Assert.Equal(200, response.StatusCode);

            var clientId = response.Body;

            // Confirm we can get the client back out
            request = new APIGatewayProxyRequest
            {
                PathParameters = new Dictionary<string, string> { { Functions.ID_QUERY_STRING_NAME, clientId } }
            };
            context = new TestLambdaContext();
            response = await functions.GetClientAsync(request, context);
            Assert.Equal(200, response.StatusCode);

            Client oldClient = JsonConvert.DeserializeObject<Client>(response.Body);
            Assert.Equal(newClient.FirstName, oldClient.FirstName);
            Assert.Equal(newClient.LastName, oldClient.LastName);
            Assert.Equal(newClient.StreetAddress, oldClient.StreetAddress);
            Assert.Equal(newClient.City, oldClient.City);
            Assert.Equal(newClient.Zip, oldClient.Zip);
            Assert.Equal(newClient.Phone, oldClient.Phone);
            Assert.Equal(newClient.Email, oldClient.Email);
            Assert.Equal(newClient.HeapLetter, oldClient.HeapLetter);
            Assert.Equal(newClient.CommunityReferral, oldClient.CommunityReferral);
            Assert.Equal(newClient.BenefitCard, oldClient.BenefitCard);
            Assert.Equal(newClient.SSILetter, oldClient.SSILetter);
            Assert.Equal(newClient.WICCard, oldClient.WICCard);
            Assert.Equal(newClient.Unemployment, oldClient.Unemployment);
            Assert.Equal(newClient.MuniHousing, oldClient.MuniHousing);
            Assert.Equal(newClient.SsdLetter, oldClient.SsdLetter);
            Assert.Equal(newClient.Agency, oldClient.Agency);
            // List the clients
            request = new APIGatewayProxyRequest
            {
            };
            context = new TestLambdaContext();
            response = await functions.GetClientsAsync(request, context);
            Assert.Equal(200, response.StatusCode);

            Client[] clients = JsonConvert.DeserializeObject<Client[]>(response.Body);
            Assert.Single(clients);
            Assert.Equal(newClient.FirstName, clients[0].FirstName);
            Assert.Equal(newClient.LastName, clients[0].LastName);
            Assert.Equal(newClient.StreetAddress, clients[0].StreetAddress);
            Assert.Equal(newClient.City, clients[0].City);
            Assert.Equal(newClient.Zip, clients[0].Zip);
            Assert.Equal(newClient.Phone, clients[0].Phone);
            Assert.Equal(newClient.Email, clients[0].Email);
            Assert.Equal(newClient.HeapLetter, clients[0].HeapLetter);
            Assert.Equal(newClient.CommunityReferral, clients[0].CommunityReferral);
            Assert.Equal(newClient.BenefitCard, clients[0].BenefitCard);
            Assert.Equal(newClient.SSILetter, clients[0].SSILetter);
            Assert.Equal(newClient.WICCard, clients[0].WICCard);
            Assert.Equal(newClient.Unemployment, clients[0].Unemployment);
            Assert.Equal(newClient.MuniHousing, clients[0].MuniHousing);
            Assert.Equal(newClient.SsdLetter, clients[0].SsdLetter);
            Assert.Equal(newClient.Agency, clients[0].Agency);

            // Delete the client
            request = new APIGatewayProxyRequest
            {
                PathParameters = new Dictionary<string, string> { { Functions.ID_QUERY_STRING_NAME, clientId } }
            };
            context = new TestLambdaContext();
            response = await functions.RemoveClientAsync(request, context);
            Assert.Equal(200, response.StatusCode);

            // Make sure the post was deleted.
            request = new APIGatewayProxyRequest
            {
                PathParameters = new Dictionary<string, string> { { Functions.ID_QUERY_STRING_NAME, clientId } }
            };
            context = new TestLambdaContext();
            response = await functions.GetClientAsync(request, context);
            Assert.Equal((int)HttpStatusCode.NotFound, response.StatusCode);
        }



        /// <summary>
        /// Create the DynamoDB table for testing. This table is deleted as part of the object dispose method.
        /// </summary>
        /// <returns></returns>
        private async Task SetupTableAsync()
        {

            CreateTableRequest request = new CreateTableRequest
            {
                TableName = this.TableName,
                ProvisionedThroughput = new ProvisionedThroughput
                {
                    ReadCapacityUnits = 2,
                    WriteCapacityUnits = 2
                },
                KeySchema = new List<KeySchemaElement>
                {
                    new KeySchemaElement
                    {
                        KeyType = KeyType.HASH,
                        AttributeName = Functions.ID_QUERY_STRING_NAME
                    }
                },
                AttributeDefinitions = new List<AttributeDefinition>
                {
                    new AttributeDefinition
                    {
                        AttributeName = Functions.ID_QUERY_STRING_NAME,
                        AttributeType = ScalarAttributeType.S
                    }
                }
            };

            await this.DDBClient.CreateTableAsync(request);

            var describeRequest = new DescribeTableRequest { TableName = this.TableName };
            DescribeTableResponse response = null;
            do
            {
                Thread.Sleep(1000);
                response = await this.DDBClient.DescribeTableAsync(describeRequest);
            } while (response.Table.TableStatus != TableStatus.ACTIVE);
        }


        #region IDisposable Support
        private bool disposedValue = false; // To detect redundant calls

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    this.DDBClient.DeleteTableAsync(this.TableName).Wait();
                    this.DDBClient.Dispose();
                }

                disposedValue = true;
            }
        }


        public void Dispose()
        {
            Dispose(true);
        }
        #endregion


    }
}
