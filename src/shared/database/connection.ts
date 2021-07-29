import { createConnection } from 'typeorm'

export default createConnection().then(() => {
  console.log('Conexão com o banco de dados feita com sucesso')
}).catch(err => {
  console.log(err)
})
