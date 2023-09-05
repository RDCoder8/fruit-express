const React = require('react')

export class New extends React.Component {
  render() {
    return (
      <div>
        <h1>
            New Vegetable Page
        </h1>
        <form action="/vegetables" method='POST'>
            Name: <input type='text' name='name'/> <br />
            Color: <input type='text' name='color'/> <br />
            Pun: <input type="text" name="pun" /> <br />
            Image: <input type='text' name='image' /> <br />
            Is Ready To Eat: <input type='checkbox' name='readyToEat' /> <br />
            <input type="submit" value="Create Vegetable" />
        </form>
        <a href='/vegetables'>Back</a>
      </div>
    )
  }
}

module.exports = New