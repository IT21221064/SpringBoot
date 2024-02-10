package com.example.lakeSidehotel.service;

import com.example.lakeSidehotel.exception.InvalidBookingRequestException;
import com.example.lakeSidehotel.exception.ResourceNotFoundException;
import com.example.lakeSidehotel.model.BookedRoom;
import com.example.lakeSidehotel.model.Room;
import com.example.lakeSidehotel.repository.BookingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.Console;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BookingService implements IBookingService {

    private final BookingRepository bookingRepository;
    private final IRoomService roomService;

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
    return bookingRepository.findByRoomId(roomId);
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookingRepository.findAll();
    }

    @Override
    public void cancelBooking(Long bookingId) {
        bookingRepository.deleteById(bookingId);
    }

    @Override
    public String saveBooking(Long roomId, BookedRoom bookingRequest) {
      // if(bookingRequest.getCheckInDate().isBefore(bookingRequest.getCheckOutDate())){
         //   throw new InvalidBookingRequestException("Check-in data must come before check-out data");

     //   }
        System.out.println("Check-in Date: " + bookingRequest.getCheckInDate());
        System.out.println("Check-out Date: " + bookingRequest.getCheckOutDate());
        Room room = roomService.getRoomById(roomId).get();
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest,existingBookings);
        if(roomIsAvailable){
            room.addBooking(bookingRequest);
            bookingRepository.save(bookingRequest);
        }else{
            throw new InvalidBookingRequestException("Sorry, This room is not available for the selected date ");
        }

        return bookingRequest.getBookingConfirmationCode();
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String confirmationCode) {
        return bookingRepository.findByBookingConfirmationCode(confirmationCode)
                .orElseThrow(()->new ResourceNotFoundException("No booking found with booking code: "+confirmationCode));
    }

    private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
    return existingBookings.stream()
            .noneMatch(existingBooking ->
                    bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                    || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                    ||(bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                    && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                    || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                    && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                    || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                    && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                    ||(bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                    && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                    ||(bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                    && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))

            );

    }


}
