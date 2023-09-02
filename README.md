# Receipt Processor

### Introduction

The API is implemented using JavaScript, the service accepts receipt data in JSON and assigns a unique ID to each processed receipt. Customers can use ID to obtain the points.

### Instruction

Ensure you have Docker installed.

1. Clone the repository: `git clone https://github.com/Einsgates/FetchBackEnd.git`

2. Navigate to the Dockerfile directory

3. Run Docker command

   `docker build -t receipt-processor .`

   `docker run -p 5050:5050 receipt-processor`

   Then go to `http://localhost:5050`

4. Have fun