const { GraphQLServer } = require('graphql-yoga')
const axios = require('axios')

const resolvers = {
  Query: {
    animals: () =>
      axios.get(`http://localhost:3000/animals`)
        .then(response => response.data)
        .catch(error => console.log(error)),
    animal: (root, { id }) =>
      axios.get(`http://localhost:3000/animals/${id}`)
        .then(response => response.data)
        .catch(error => console.log(error))
  },
  Mutation: {
    postAnimal: (root, args) => {
       const animal = {
        id: args.id,
        name: args.name,
        age: args.age,
        type: args.type,
      }

      axios.post(`http://localhost:3000/animals`, animal)
        .then(response => response)
        .catch(error => error)

      return animal
    }
  },
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
