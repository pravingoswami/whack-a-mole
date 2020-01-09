import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { Table, Container, Button } from 'reactstrap';

class App extends React.Component{
    
    constructor(){
        super()
        this.state = {
            matrix : [],
            row : 9,
            col : 9,
            color : "white",
            point : 0, 
            disabled : false,
            counter : 30,
            user : ''
        }
    }

    componentDidMount = () => {
        let matrix = []
        const m = this.state.row
        const n = this.state.col
        size(m,n)
        function size(m, n) {
            for(var i = 0; i < n; i++) {
                matrix.push(new Array(m).fill(' '))
            }
            return matrix
        }
        this.setState({matrix})

        const user = prompt('Enter your name and start 30 sec\'s game')
         user && this.setState({user})

        setTimeout (() => {
            this.setState({
                disabled : "true"
            })
            alert(`Game Over your Points - ${this.state.point}`)
        }, 30000) 

        setInterval(() => {
            this.state.counter != 0 &&  this.setState(prevState => ({
                counter : prevState.counter - 1
            }))
        }, 1000)


    }

    handleBox = (e, r, c) => {
        const random = () => {
            return (Math.round(Math.random() * 8))
        }
        console.log(random())
        
        // document.getElementsById(`${r}${c}`).style.background='black';

        const temp1 = random()
        const temp2 = random()
        console.log(temp1, temp2)
        setTimeout(() => {
            document.getElementById(`${temp1}${temp2}`).style.background = "black"
            setTimeout (() =>{
                document.getElementById(`${temp1}${temp2}`).style.background = "white" 
            }, 500)
        }, 500)

        if(temp1 == r && temp2 == c){
            this.setState(prevState => ({
                point : prevState.point + 1
            }))
        }

        console.log(r, c)


        // setTimeout(() => {
        //     document.getElementById(`${r}${c}`).style.background = "black"
        //     setTimeout (() =>{
        //         document.getElementById(`${r}${c}`).style.background = "white" 
        //     }, 500)
        // }, 500)
        // console.log(r, c)




        // console.log(e.target.value)
        // e.target.value.style.background = "blue"hi
        // console.log(matrix)

    }

    render() {
        return (
            <Container>
             <div>
                 <br></br>
                <h1>{this.state.user}'s Points - {this.state.point}</h1>
                <b><p>Time Remaining - {this.state.counter}</p></b>
                <br></br>
                 <Table bordered>
                     {
                         this.state.matrix.map((col, i) => {
                            const c = i
                            // console.log(j)
                             return(
                                 <tr  style = {{width : "50px", height : "50px"}} >
                                     {
                                         col.map((row, i) => {
                                             const r = i
                                             return(
                                             <td style = {{padding : "0px", background : "white"}} 
                                             key = {`${r}${c}`}
                                             name = "box"
                                             id = {`${r}${c}`}
                                             ><Button 
                                                    color="white" 

                                                    disabled = {this.state.disabled}
                                                    value = {`${r}${c}`}
                                                    // color = {this.state.color}
                                                    style = {{height : "50px", width : "120px"}}
                                                    onClick = {(e) => this.handleBox(e,r,c)}
                                                    >
                                                    {row}
                                                </Button>{' '}</td>
                                             )
                                         })
                                     }
                                 </tr>
                             )
                         })
                     }
                 </Table>
             </div>
             </Container>
        );
    }
}

export default App