const React = require('react')
const DefaultLayout = require('../layout/Default')

class New extends React.Component {
  render() {
    return (
      <DefaultLayout>
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
      </DefaultLayout>
    )
  }
}

module.exports = New