export function createHandleScroll({ spread= 20, scrollRef, status, fetchMore }){
    return () => {
        console.log("HANDLE SCROLL");
        const scrollContainer = scrollRef.current;
        if (scrollContainer){
            const ct = scrollContainer.scrollTop;
            const ch = scrollContainer.clientHeight;
            const sh = scrollContainer.scrollHeight;
            //console.log(ct + " + " + ch + "+" + spread + "=>" + sh)
            if ((ct + ch + spread) >= sh && status !== 'pending') {
                //console.log(" start ")
                fetchMore();
            }
        }
    };
}