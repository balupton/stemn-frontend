angular.module('modules.medium-editor-ext-backspace-merge', [
]);
angular.module('modules.medium-editor-ext-backspace-merge').

service('MediumEditorBackspaceMergeExt', function ($timeout, RealtimeEditorService) {

	this.backspaceMerge = backspaceMerge; // function(scope, element, attrs)

	/////////////////////////////////////////////////////////////////

	function backspaceMerge(scope, iElement) {
		return window.MediumEditor.Extension.extend({
			name: 'backspace-section-merge',
			init: function () {
				this.subscribe('editableKeyup', this.handleKeydown.bind(this));
			},
			memory: {
				lastCaretOffset: ''
			},
			handleKeydown: function (event, editable) {
				var self = this;
				// If key pressed was backspace
				if (event.keyCode == 8) {
					// If the current section and previous section is 'text'
					if (checkMergeAbove()) {
						// Get the caret offset position so we know if we are at the start of the editable
						var range = window.getSelection().getRangeAt(0);
						var caretOffset = getCharacterOffsetWithin(range, editable);
						if (caretOffset === 0 && self.memory.lastCaretOffset === 0) {
							mergeWithAbove();
							scope.$apply();
						}
						self.memory.lastCaretOffset = caretOffset;
					}
				}

				////////////////////////////////////////////////////////

				function getCharacterOffsetWithin(range, node) {
					// http://stackoverflow.com/questions/4767848/get-caret-cursor-position-in-contenteditable-area-containing-html-content
					var treeWalker = document.createTreeWalker(
						node,
						NodeFilter.SHOW_TEXT,
						function (node) {
							var nodeRange = document.createRange();
							nodeRange.selectNode(node);
							return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
								NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
						},
						false
					);
					var charCount = 0;
					while (treeWalker.nextNode()) {
						charCount += treeWalker.currentNode.length;
					}
					if (range.startContainer.nodeType == 3) {
						charCount += range.startOffset;
					}
					return charCount;
				}

				function deleteSection(){
					delete scope.editorSections[scope.editorSectionId]
					scope.editorOrder.splice(scope.editorSectionIndex,1);
					if(scope.editorOptions.realtime){RealtimeEditorService.deleteSection(scope.editorSectionId)};
				}

				function checkMergeAbove(){
					// returns true if we can merge
					if(scope.editorSections[scope.editorOrder[scope.editorSectionIndex]] && scope.editorSections[scope.editorOrder[scope.editorSectionIndex-1]] &&
					   (!RealtimeEditorService.edits[scope.editorOrder[scope.editorSectionIndex-1]] || !scope.editorOptions.realtime) && // If the previous section is not locked
						scope.editorSections[scope.editorOrder[scope.editorSectionIndex]].type == 'text' && scope.editorSections[scope.editorOrder[scope.editorSectionIndex-1]].type == 'text'){
						return true
					}
					else {
						return false;
					}
				}

				function mergeWithAbove(){
					// Check if we can merge
					if(checkMergeAbove()){
						// Add the content onto the previous section
						scope.editorSections[scope.editorOrder[scope.editorSectionIndex-1]].content = scope.editorSections[scope.editorOrder[scope.editorSectionIndex-1]].content + scope.editorSections[scope.editorOrder[scope.editorSectionIndex]].content;
						if(scope.editorOptions.realtime){RealtimeEditorService.saveSection(scope.editorSections[scope.editorOrder[scope.editorSectionIndex-1]])}
						scope.editorSections[scope.editorOrder[scope.editorSectionIndex-1]].contentElement.focus();
						deleteSection();
					}
				}

			}
		});
	}
});
