# Heart Rate Processing API

## How to Run

1. Install dependencies:
    ```bash
    npm install
    ```

2. Set up PostgreSQL and create the `heart_rate_intervals` table:
    ```sql
    CREATE TABLE health_data (
    id SERIAL PRIMARY KEY,
    patient_id TEXT,
    org_id TEXT,
    timestamp TIMESTAMPTZ,
    data JSONB
   ); 
   ```

3. Update the PostgreSQL credentials in `.env`.

4. Run the server:
    ```bash
    npm run start 
    ```
   OR
    ```bash
    npm run dev 
    ```

5. Send POST requests to `http://localhost:3000/api/heart-rate/process` with the JSON payload.
