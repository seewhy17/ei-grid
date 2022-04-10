import { render, screen } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import App from '../App.vue'

describe(App, () => {
    it('renders page correctly', async () => {
        render(App)
        const view = await screen.findByText('Filter')
        expect(view.innerHTML).toBe('Filter')

    })
})





