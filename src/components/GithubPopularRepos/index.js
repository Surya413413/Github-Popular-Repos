import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    activeTabId: languageFiltersData[0].id,
    dataFetched: false,
    allList: [],
    apiStatus:apiStatusConstants.inProgress
  }

  componentDidMount() {
    this.getAllDetails()
  }

  selectedLanguage = id => {
    this.setState({activeTabId:id},this.getAllDetails)
  }

  getAllDetails = async () => {
    this.setState({apiStatus:apiStatusConstants.inProgress})
    const {activeTabId} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const formateData = data.popular_repos.map(each => ({
      name: each.name,
      id: each.id,
      issuesCount: each.issues_count,
      forksCount: each.forks_count,
      starsCount: each.stars_count,
      avatarUrl: each.avatar_url,
    }))
    if (response.ok === true) {
      this.success()
      this.setState({allList: formateData,apiStatus:apiStatusConstants.success})
      
    } else {
      this.failuerData()
    }
  }

  failuerData = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="image-failuer"
        />
      </div>
    )
  }

  success = () => {
    const {allList} = this.state
    return (
      <div>
        {allList.map(each => (
          <RepositoryItem allDetailsList={each} key={each.id} />
        ))}
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )


  renderResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus){
      case apiStatusConstants.success:
      return this.success()
      case apiStatusConstants.failure:
      return this.failuerData()
      case apiStatusConstants.inProgress:
      return this.renderLoader()
    }

  }

  render() {
    return (
      <div className="app-container">
        <h1 className="heading-style">Popular</h1>
        <ul className="unorder-list-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              languageDetails={each}
              key={each.id}
              selectedLanguage={this.selectedLanguage}
            />
          ))}
        </ul>
        <div></div>

        <ul className="unorder-success-container">{this.renderResult()}</ul>
      </div>
    )
  }
}
export default GithubPopularRepos
