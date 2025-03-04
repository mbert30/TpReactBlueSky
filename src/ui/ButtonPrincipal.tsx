const ButtonPrincipal = ({ onClickButton = () => {} , idButton = '', valueButton = 'Valider'}) => {
  return (
    <button className="p-5 pt-1 pb-1 bg-(--dm-primary-a20) hover:(--dm-primary-a20) rounded-sm ring-1 ring-(--clr-light-a0) shadow-lg shadow-(--dm-primary-a20) hover:shadow-(--dm-primary-a20) transition delay-150 hover:scale-110 text-(--clr-light-a0)" onClick={onClickButton} id={idButton} type="submit">{valueButton}</button>
  )
}

export default ButtonPrincipal