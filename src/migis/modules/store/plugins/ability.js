export default(store) => {
  const abilities = store.getters['migis/auth/userAbilities']

  return store.subscribe((mutation) => {
    switch(mutation.type){
      case 'migis/auth/SET_USERABILITIES':
        abilities.update(mutation.payload)
        break
    }
  })
}