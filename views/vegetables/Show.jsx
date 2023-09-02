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
            And says "{vegetables.pun}"
            <br></br>
            <img src={vegetables.image} width={300} height={300}/>
          </div>
         );
        }
     }
     module.exports  = Show;