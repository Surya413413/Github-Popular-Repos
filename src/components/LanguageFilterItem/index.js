// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, selectedLanguage} = props
  const {language, id} = languageDetails

  const onClickLanguge = () => {
    selectedLanguage(id)
  }

  return (
    <li className="list-container">
      <button onClick={onClickLanguge}>
        <p className="para-style">{language}</p>
      </button>
    </li>
  )
}
export default LanguageFilterItem
