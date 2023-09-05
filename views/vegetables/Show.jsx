const React = require('react')
    class Show extends React.Component {
       render () {
        const vegetables = this.props.vegetables
        return (
          <div>
            <h1>
                Show Page
            </h1>
            The {vegetables.name} is {vegetables.color}.
            <br />
            It {vegetables.readyToEat ? "is ready to be eaten" : "looks a bit funky"} and says "{vegetables.pun}"
            <br/>
            <img src={vegetables.image} width={300} height={300}/>
            <br />
            <a href='/vegetables'>Back</a>
          </div>
         );
        }
     }
     module.exports  = Show;