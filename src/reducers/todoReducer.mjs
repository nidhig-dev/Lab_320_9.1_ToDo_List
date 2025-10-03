export default function reducer(state, action) {
        switch (action.type) {
            case 'toggleCheck': {
                return state.map((eachTodo) => ((eachTodo.id === action.payload.id)
                    ? { ...eachTodo, completed: !eachTodo.completed }
                    : eachTodo
                ))
            }
            case 'Edit': {

                return state;
            }
            case 'Delete': {
                return state.filter((eachTodo) => (
                    (eachTodo.id !== action.payload.id)

                ))
            }
            case 'Add': {
                let newTodo = {
                    id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
                    title: action.payload.name,
                    completed: false
                };

                return ([...state, newTodo])
            }
            case 'Save': {
                return state.map((eachTodo) => ((eachTodo.id === action.payload.id)
                    ? { ...eachTodo, title: action.payload.value }
                    : eachTodo
                ))
            }
            default: {
                // alert("Invalid action");
                return state;

            }
        }
    }