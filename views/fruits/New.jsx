const React = require('react')

export class New extends React.Component {
  render() {
    return (
      <div>
        <h1>
            New Fruit Page
        </h1>
        <form action="/fruits" method='POST'>
            Name: <input type='text' name='name'/> <br />
            Color: <input type='text' name='color'/> <br />
            Is Ready To Eat: <input type='checkbox' name='readyToEat' /> <br />
            Image: <input type='text' name='image' /> <br />
            <input type="submit" value="Create Fruit" />
        </form>
        <a href='/fruits'>Back</a>
      </div>
    )
  }
}

module.exports = New