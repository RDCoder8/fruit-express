const React = require('react')
    class Show extends React.Component {
       render () {
        const fruit = this.props.fruit
        return (
          <div>
            <h1>
                Show Page
            </h1>
            The {fruit.name} is {fruit.color}.
            And {
                fruit.readyToEat ?
                    "it's good to munch on."
                :
                    "naw, this ain't a munch."
            }
            <br />
            <img src={fruit.image} width={300} height={300} alt='Fruit Image'/>
            <br />
            <a href='/fruits'>Back</a>
          </div>
         );
        }
     }
     module.exports  = Show;