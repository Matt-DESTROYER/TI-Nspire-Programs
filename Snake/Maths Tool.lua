local scene = 0
local active = 0
local width, height = 0, 0

function on.resize()
	width = platform.window:width()
	height = platform.window:height()
end

function on.paint(gc)
	if scene == 0 then
		gc:setColorRGB(0, 0, 0)
		gc:setFont("sansserif", "r", 20)
		gc:drawString("Maths Tool", width / 2 - gc:getStringWidth("Maths Tool") / 2, 14, "top")
		gc:setFont("sansserif", "r", 9)
		gc:drawString("Developed by Matthew James", width / 2 - gc:getStringWidth("Developed by Matthew James") / 2, 56, "top")
		gc:setFont("sansserif", "r", 14)
		if active == 0 then
			gc:drawString("> Surd Simplifier <", width / 2 - gc:getStringWidth("> Surd Simplifier <") / 2, 100)
		else
			gc:drawString("Surd Simplifier", width / 2 - gc:getStringWidth("Surd Simplifier") / 2, 100)
		end
		if active == 1 then
			gc:drawString("> Coming Soon <", width / 2 - gc:getStringWidth("> Coming Soon <") / 2, 130)
		else
			gc:drawString("Coming Soon", width / 2 - gc:getStringWidth("Coming Soon") / 2, 130)
		end
		if active == 2 then
			gc:drawString("> Coming Soon <", width / 2 - gc:getStringWidth("> Coming Soon <") / 2, 130)
		else
			gc:drawString("Coming Soon", width / 2 - gc:getStringWidth("Coming Soon") / 2, 130)
		end
		if active == 3 then
			gc:drawString("> Coming Soon <", width / 2 - gc:getStringWidth("> Coming Soon <") / 2, 130)
		else
			gc:drawString("Coming Soon", width / 2 - gc:getStringWidth("Coming Soon") / 2, 130)
		end
	elseif scene == 1 then
	elseif scene == 2 then
	elseif scene == 3 then
	end
end

function on.arrowUp()
	if scene == 0 then
		if active == 0 then
			active = 3
		else
			active = active - 1
		end
	end
	platform.window:invalidate()
end

function on.arrowDown()
	if scene == 0 then
		if active == 3 then
			active = 0
		else
			active = ative + 1
		end
	end
	platform.window:invalidate()
end

function on.charIn(ch)
	if scene == 1 then
	end
	platform.window:invalidate()
end

function on.escapeKey()
	scene = 0
	platform.window:invalidate()
end

function on.enterKey()
	if scene == 0 then
		scene = active + 1
	end
	platform.window:invalidate()
end