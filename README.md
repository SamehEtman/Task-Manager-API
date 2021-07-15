Task manager web server 
  - Restful endpoints 
    - Create user : {{url}}/users - POST
    - login user : {{url}}/users/login -POST
    - user logout : {{url}}/users/logout -POST
    - logout off all tokens : {{url}}/users/logoutAll -POST
    - create task : {{url}}/tasks -POST
    - add profile pic : {{url}}/users/me/avatar-POST

    - read profile : {{url}}/users/me -GET
    - read tasks :  {{url}}/tasks -GET
      - it has 4 queries {completed=true&sortBy=desc&skip=1&limit=3}
     
    - edit user : {{url}}/users/me -PATCH
    - edit task : {{url}}/tasks/:id -PATCH
    
    - delete profile : {{url}}/users/me -DELETE
    - delete task : {{url}}/tasks/:id-DELETE
    - delete avatar : {{url}}/users/me/avatar-DELETE
    
  - Used json web token
    - all users should be authorized using json web tokne
  
  - Mongo DB 
    - Users : {name , email , age , password , tokens , avatar , virtual tasks}
    - Tasks : {description , completed , owner}
