KISSY.add(function (S, Node,Demo) {
    var $ = Node.all;
    describe('anime', function () {
        it('Instantiation of components',function(){
            var demo = new Demo();
            expect(S.isObject(demo)).toBe(true);
        })
    });

},{requires:['node','gallery/anime/1.0/']});