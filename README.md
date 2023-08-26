# FROOTR
A description of your game. Background info of the game is a nice touch.

# Screenshot

<img src="url to your image on imgur">
<img src="url to your image on imgur">

# Technologies Used

- JavaScript
- EJS
- CSS
- Mongoose
- Express

# Getting Started

DATABASE_URL=

GOOGLE_CLIENT_ID=
GOOGLE_SECRET=
If running locally
GOOGLE_CALLBACK=http://localhost:3000/oauth2callback

SECRET=

[Click to View Project Planning](your Trello url here)
[Click to Play Connect Four!](your deployment url here)

## Routing

#### Smoothies

|HTTP<br>Method|URL<br>Endpoint|Controller<br>Action|Purpose|
|---|---|---|---|
| GET | /fruits | fruitsCtrl.index | View all the fruits submitted by the logged in user |
| GET | /books/all | booksCtrl.allBooks | View all the books regardless of who submitted (use querystring params to perform filtering) |
| GET | /books/:id | booksCtrl.show | View the details of any book |
| GET | /books/new | booksCtrl.new | View a form for submitting a book (be sure to define this route before the show route)|
| POST | /books | booksCtrl.create | Handle the new book form being submitted |
| GET | /books/:id/edit | booksCtrl.edit | View a form for editing a book (restrict to user who submitted the book) |
| PUT | /books/:id| booksCtrl.update | Handle the edit book form being submitted (restrict to user who submitted the book) |
| DELETE | /books/:id| booksCtrl.delete | Delete a book (restrict to user who submitted the book) |
| POST | /books/:id | booksCtrl.addReading | Add the logged in user's _id to a book's userReading array |

#### Ingredients

|HTTP<br>Method|URL<br>Endpoint|Controller<br>Action|Purpose|
|---|---|---|---|
| n/a | n/a | index action | View all the comments for a book - no route needed since comments are embedded and displayed with their book |
| n/a | n/a | show action | Viewing a single comment does not make sense |
| n/a | n/a | new action | The form to add a new comment should be displayed on the book's show view |
| POST | /books/:id/comments | commentsCtrl.create | Handle the new comment form being submitted |
| GET | /comments/:id/edit | commentsCtrl.edit | View a form for editing a comment (restrict to user who submitted the comment) |
| PUT | /comments/:id| commentsCtrl.update | Handle the edit comment form being submitted (restrict to user who submitted the comment) |
| DELETE | /comments/:id| commentsCtrl.delete | Delete a comment (restrict to user who submitted the comment) |




# Next Steps

- Future enhancement one...
- Future enhancement two... 