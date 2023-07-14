# Money Tracker - fsd assignment


**monet** (money tracker) is a simple budget tracking web application. 
Track and receive insights using various information about transactions made.
Split transaction amounts with different users.
Authenticates using username and hash of the password.

## Contact
- Email: sakeerthi23@gmail.com
##### Table of Contents  
- [Screenshots](#screenshots)  
- [Installation](#installation)  
- [Contact Info](#contact) 

Tech stack used:
- Frontend: React
- Backend: ExpressJS
- 
Other notable libraries used:
- React Bootstrap
- Express Session for authentication

## Screenshots
![image](https://user-images.githubusercontent.com/12008678/212482447-263f4be7-4334-42f7-bf5d-a6cb3524c43e.png)
![image](https://user-images.githubusercontent.com/12008678/212482636-9d220bea-b09c-47f7-b0bd-e117c15c8b85.png)
![image](https://user-images.githubusercontent.com/12008678/212482670-a8b76571-8673-4057-a92e-eb72edfb72b6.png)
![image](https://user-images.githubusercontent.com/12008678/212482993-106d39a0-b1e8-441f-b256-3ce39372417a.png)

## Installation
- Clone into the repo using:  `git clone https://github.com/Nectres/money-tracker`
- Go into the directory `cd money-trakcer`
- Run the command `npm run dev-prepare`, this command will install and initialize all the required packages
- Once installed, run the `npm run dev` to start both the frontend and backend server. Please wait for the `Express Server started` message to appear in the console
- Then head to `http://localhost:5173` in your browser to start using the application
## Demo Credentials:
- Username: `user1`
- Password: `pass1`
- This account has a monthly budget of Rs.15000
## Transaction
- The home page automatically shows the transactions made by the user ordered by time they were done.
- Use the filter button to apply various filters 
- To **create** Click Add Expense in the home page after signing into the above account or registering a new account
- Click the Split with others checkbox to split with:
    - In the text field type the name of a person and click Add
    - If the username exists in the application, they will also receive a transaction and they will owe you the money split
- **Edit** / update a transaction by clicking the pencil icon beside a transaction
- **Delete** a transaction by clicking the trash icon in the transaction

## Owed
- When you create a transaction and split them with other users, they will owe you the amount that was split.
- They can click on Settle to settle the money they owe to you
- Similarly, you can settle the money you owe others.

## Profile
- Click the arrow top-right button with the username to either logout or edit the profile
- Editing the profile, you can change the monthly budget that was set when the account  was registered