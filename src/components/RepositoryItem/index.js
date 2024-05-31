// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {allDetailsList} = props
  const {name, id, issuesCount, forksCount, starsCount, avatarUrl} =
    allDetailsList
  return (
    <li className="list-container2">
      <img src={avatarUrl} className="image-avatarUrl" alt={name}/>
      <h1 className="name-style">{name}</h1>
      <div className="start-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="star-img"
        />
        <p className="startcount-style">{starsCount}</p>
      </div>
      <div className="start-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="star-img"
        />
        <p>{forksCount}</p>
      </div>
      <div className="start-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="star-img"
        />
        <p>{issuesCount}</p>
      </div>
    </li>
  )
}
export default RepositoryItem
