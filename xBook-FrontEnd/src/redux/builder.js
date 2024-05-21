export default function builders(builder, extraReducer, atState){
    builder
        .addCase(extraReducer.pending, state => {
            state[atState].status = 'pending';
            state[atState].error = null;
        })
        .addCase(extraReducer.fulfilled, (state, action) => {
            state[atState].obj = action.payload;
            state[atState].status = 'fulfilled';
            state[atState].error = null;
        })
        .addCase(extraReducer.rejected, (state, action) => {
            state[atState].error = action.payload;
            state[atState].status = 'rejected';
        })
}