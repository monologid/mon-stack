import { useState } from 'react';

const useDataState = (initialState: any) => {
	const [state, setState] = useState<any>(initialState)

	const setDataState = (newState: any) => {
		setState((prevState: any) => {
			return {
				...prevState,
				...newState
			}
		})
	}

	return [state, setDataState]
}

export default useDataState