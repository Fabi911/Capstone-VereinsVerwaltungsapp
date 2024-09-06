package de.webdev.backend.members.controller;


import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class ErrorController {

	@ExceptionHandler(NoHandlerFoundException.class)
	public String handle404(NoHandlerFoundException ex, Model model) {
		return "redirect:/";
	}
}