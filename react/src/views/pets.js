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
            <main>
                <form onSubmit={this.addPet}>
                    <label> Name
                        <input name="name" />
                    </label>
                    <label> Client ID
                        <input name="clientId" />
                    </label>
                    <label> Gender
                        <select>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </label>
                    <label> Altered
                        <select>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </label>
                    <input type="submit" />
                </form>
                <ul>
                    {this.state.pets.map(pet => <li key={pet.id}>{pet.name}</li>)}
                </ul>    
            </main>
        );
    }
}
export default pets;