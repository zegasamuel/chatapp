import React from 'react'
import ChatApp from './Chat'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <div className="App">
                    <ChatApp />
                </div>
            </PersistGate>
        </Provider>
    )
}

export default App
