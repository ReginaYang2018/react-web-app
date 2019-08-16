import React from 'react'
import List from './common/scrollList.jsx'
import Pro from './common/pro.jsx'
import Send from '../utils/model.js'
import { hashHistory} from 'react-router'

class Home extends React.Component{
	constructor(){
		super()
		this.state  = {
			productList :[]
		}
	}
	getMore(){
		let self = this
		Send('hot_search_words',null,(data)=>{
			this.setState({
				productList:this.state.productList.concat(data)
			})
		})
	}
	componentWillMount() {
		Send('hot_search_words',null,(data)=>{
			this.setState({
				productList:this.state.productList.concat(data)
			})
		})
	}
	gotoSearch(e){

		if(e.keyCode === 13 && e.target.value && e.target.value.replace(/\s/g,'')){
			hashHistory.push('/searchlist?qhfrom=home&title='+e.target.value.replace(/\s/g,''))
		}
	}
	render(){
		return(
			<div>
				<div className="head-box">
					<input placeholder="搜索商家、商品" className="input-arae" onKeyUp={this.gotoSearch.bind(this)}/>
				</div>
				<div className="content">
					<h3 className="hot-title">推荐商家</h3>
					<List
						list={Pro}
						pagename={'home'}
						data={this.state.productList}
						onScroll = {this.getMore.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default Home
