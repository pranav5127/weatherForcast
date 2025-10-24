import {JSX} from "react"
import { View, Text, StyleSheet } from "react-native"

function Search({query}: {query: string}): JSX.Element {
   return (
       <View style={styles.container}>
           <Text>
               {query}
           </Text>
       </View>
   )
}

export default Search


const styles = StyleSheet.create({
   container: {
       height: 200,
       width: 100,
       backgroundColor: "#876543"
   }
})