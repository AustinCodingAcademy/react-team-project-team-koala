import React from 'react';

class pets extends React.Component {

    state = {
        pets: []
    }

    componentDidMount = () => {
        this.fetchPets()
    }

    fetchPets = async() => {
    const response = await fetch('/api/pets')
    const pets = await response.json()
    this.setState({ pets: pets })
    }

    render() {
        return (
            <ul>
                {this.state.pets.map(pet => <li key={pet.id}>{pet.name}</li>)}
            </ul>    
        );
    }
}
export default pets;