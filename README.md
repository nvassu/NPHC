This Project is a Simple ReactJS Project which demonstrates the following

build an MVP employee salary management webapp to manage employees'salaries by:
Creating a Component in React
Communicating between parent and child component
Using MUI along with React
Using Basic Routing in React
The project Template can be used to build bigger projects

The app contains an employee list with the following information:
id - unique alphanumeric ID assigned by the company.
username - unique alphanumeric login assigned by the company.
fullName - possibly non-unique name. May not be in English, so please use UTF-8 encoding.

Live Application URL:

https://github.com/nvassu/NPHC.git

Prerequisites:

1. Install create-react-app
2. Install MUI (@emotion/react, @emotion/styled, @mui/icons-material, @mui/material, @mui/styled-engine-sc, @mui/styles, @mui/x-data-grid, lodash)

salary - decimal that is >= 0.00.

Top Level ReadMe on how the assessment is built:

1. The coding assessment is done completely based on the user requirement.
2. The Given API in the task was not functioning hence created my own and tried to build the applicartion
3. As the assessment is about the employee salary management and the given design was clean and clear on the requirement i have designed as per the given design.
4. while building the code itself i have considered certain validations and conditions like:

   1. As per the main Screen must contain a an image and username section on the left.
      a) Upon clicking the image a popup occurs that helps the user to upload the CSV file of the employee salary details.
      b) The Uploading is done via a modal
      c) The modal allows only CSV file
      d) File size is less than 2MB
      e) A Success message when file is uploaded successfully is shown
      f) Error message when there is an error uploading the file is shown
      g) id and login must be unique and shouldn't be repeated in anther row.
      h) The whole upload is considered a single transaction. If one or more of the rows fails validation, the entire file is rejected.
   2. In the center main screen two input fields with minimum and maximum ranges that defines the salary ranges that needs to be considered to display upon clicking search button.
      a) When the minimum salary and maximum salary is given by the user in the respective fields a search action is done
      b) The details of the respective employees whose range is in between minimum and maximum range is shown in the table.
      If the fields are empty then the details of all the employees in the table are been displayed.

   3. Under the input filters a table that consist of user details, Edit and delete images respectively.
      a) Under the main section there is a table and the tabler pagination that helps to display number of rows.
      b) The table has 5 columns which includes ID, Login, name, salary and action column. All the columns can be sorted in ascending or in descending order
      c) The action column has edit and delete option. Upon edit a modal popup is been displayed with name, login and salary inputs that can be edited.
      d) ones the CSV file is uploaded the employee salary details are displayed in the main table.
      e) If the ID of an employee is already present and the details are same in the current table then the details should be ignored.
      f) If the ID is same and the details are varying then the details of that perticular ID are Updated in the table
      g) When there is a New user ID then a new row is created with the new emplyee ID and its respective details

Note: Since the given API was not working unable to perform CRUD operations.
