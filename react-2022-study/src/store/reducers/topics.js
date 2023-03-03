// eslint-disable-next-line import/no-anonymous-default-export
export default (topics={
  page: 1,
  loading: false,
  data: []
},action) => {
 // eslint-disable-next-line default-case
 switch(action.type){
  case 'topics/loading':
    return {
      ...topics,
      loading: true
    }
    case 'topics/addPage':
      return {
        ...topics,
        page: topics.page + 1
      }
    case 'topics/update':
      return {
        ...topics,
        loading: false,
        data: action.data
      }
      default:
        return topics
 }
}